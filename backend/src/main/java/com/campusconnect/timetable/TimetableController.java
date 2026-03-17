package com.campusconnect.timetable;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/timetable")
@RequiredArgsConstructor
public class TimetableController {
	private final TimetableRepository repo;

	@GetMapping
	public TimetableResponse get() {
		TimetableConfig cfg = repo.findById(1L).orElseGet(() -> repo.save(new TimetableConfig()));
		return new TimetableResponse(cfg.getImageDataUrl(), cfg.getUpdatedAt());
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping
	public TimetableResponse upsert(@Valid @RequestBody UpsertTimetable req) {
		if (!req.imageDataUrl().startsWith("data:image/")) {
			throw new IllegalArgumentException("Please upload a valid image");
		}

		TimetableConfig cfg = repo.findById(1L).orElseGet(TimetableConfig::new);
		cfg.setImageDataUrl(req.imageDataUrl());
		cfg.setUpdatedAt(Instant.now());
		cfg = repo.save(cfg);
		return new TimetableResponse(cfg.getImageDataUrl(), cfg.getUpdatedAt());
	}

	public record UpsertTimetable(@NotBlank String imageDataUrl) {}

	public record TimetableResponse(String imageDataUrl, Instant updatedAt) {}
}

