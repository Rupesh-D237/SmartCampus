package com.campusconnect.lostfound;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
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
@RequestMapping("/api/lost-found")
@RequiredArgsConstructor
public class LostFoundController {
	private final LostFoundRepository repo;

	@GetMapping
	public List<LostFoundItem> list() {
		return repo.findAll().stream()
			.sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
			.toList();
	}

	@PostMapping
	public LostFoundItem create(@Valid @RequestBody UpsertLostFound req) {
		req.validate();
		LostFoundItem i = new LostFoundItem();
		i.setItem(req.item());
		i.setDetails(normalizeBlankToNull(req.details()));
		i.setImageDataUrl(normalizeBlankToNull(req.imageDataUrl()));
		return repo.save(i);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public LostFoundItem update(@PathVariable Long id, @Valid @RequestBody UpsertLostFound req) {
		req.validate();
		LostFoundItem i = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
		i.setItem(req.item());
		i.setDetails(normalizeBlankToNull(req.details()));
		i.setImageDataUrl(normalizeBlankToNull(req.imageDataUrl()));
		return repo.save(i);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		repo.deleteById(id);
	}

	public record UpsertLostFound(
		@NotBlank String item,
		@Size(max = 5000) String details,
		@Size(max = 8_000_000, message = "Image is too large. Please upload a smaller image.") String imageDataUrl
	) {
		void validate() {
			boolean hasDetails = details != null && !details.isBlank();
			boolean hasImage = imageDataUrl != null && !imageDataUrl.isBlank();
			if (!hasDetails && !hasImage) {
				throw new IllegalArgumentException("Please provide details text or an image");
			}
			if (hasImage && !imageDataUrl.startsWith("data:image/")) {
				throw new IllegalArgumentException("Please upload a valid image");
			}
		}
	}

	private static String normalizeBlankToNull(String s) {
		if (s == null) return null;
		String t = s.trim();
		return t.isEmpty() ? null : t;
	}
}

