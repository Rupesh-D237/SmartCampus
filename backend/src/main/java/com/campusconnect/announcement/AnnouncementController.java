package com.campusconnect.announcement;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
public class AnnouncementController {
	private final AnnouncementRepository repo;

	@GetMapping
	public List<Announcement> list() {
		return repo.findAll().stream()
			.sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
			.toList();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public Announcement create(@Valid @RequestBody UpsertAnnouncement req) {
		Announcement a = new Announcement();
		a.setTitle(req.title());
		a.setMessage(req.message());
		a.setPostedBy(req.postedBy());
		return repo.save(a);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public Announcement update(@PathVariable Long id, @Valid @RequestBody UpsertAnnouncement req) {
		Announcement a = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
		a.setTitle(req.title());
		a.setMessage(req.message());
		a.setPostedBy(req.postedBy());
		return repo.save(a);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		repo.deleteById(id);
	}

	public record UpsertAnnouncement(
		@NotBlank String title,
		@NotBlank String message,
		@NotBlank String postedBy
	) {}
}

