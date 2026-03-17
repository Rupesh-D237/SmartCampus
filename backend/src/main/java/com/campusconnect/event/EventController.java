package com.campusconnect.event;

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
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {
	private final EventRepository repo;

	@GetMapping
	public List<Event> list() {
		return repo.findAll().stream()
			.sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
			.toList();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public Event create(@Valid @RequestBody UpsertEvent req) {
		Event e = new Event();
		e.setTitle(req.title());
		e.setDateLabel(req.dateLabel());
		e.setLocation(req.location());
		e.setDescription(req.description());
		return repo.save(e);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public Event update(@PathVariable Long id, @Valid @RequestBody UpsertEvent req) {
		Event e = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
		e.setTitle(req.title());
		e.setDateLabel(req.dateLabel());
		e.setLocation(req.location());
		e.setDescription(req.description());
		return repo.save(e);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		repo.deleteById(id);
	}

	public record UpsertEvent(
		@NotBlank String title,
		@NotBlank String dateLabel,
		@NotBlank String location,
		@NotBlank String description
	) {}
}

