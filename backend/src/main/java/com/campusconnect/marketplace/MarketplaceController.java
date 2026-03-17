package com.campusconnect.marketplace;

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
@RequestMapping("/api/marketplace")
@RequiredArgsConstructor
public class MarketplaceController {
	private final MarketplaceRepository repo;

	@GetMapping
	public List<MarketplaceListing> list() {
		return repo.findAll().stream()
			.sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
			.toList();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping
	public MarketplaceListing create(@Valid @RequestBody UpsertListing req) {
		MarketplaceListing l = new MarketplaceListing();
		l.setItem(req.item());
		l.setPriceLabel(req.priceLabel());
		l.setDetails(req.details());
		return repo.save(l);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public MarketplaceListing update(@PathVariable Long id, @Valid @RequestBody UpsertListing req) {
		MarketplaceListing l = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
		l.setItem(req.item());
		l.setPriceLabel(req.priceLabel());
		l.setDetails(req.details());
		return repo.save(l);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		repo.deleteById(id);
	}

	public record UpsertListing(
		@NotBlank String item,
		@NotBlank String priceLabel,
		@NotBlank String details
	) {}
}

