package com.campusconnect.issue;

import com.campusconnect.security.UserPrincipal;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.Instant;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssueController {
	private final IssueRepository repo;

	@GetMapping
	public List<Issue> list(Authentication auth) {
		UserPrincipal principal = requirePrincipal(auth);
		boolean isAdmin = principal.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
		List<Issue> issues = isAdmin ? repo.findAll() : repo.findAllByCreatedByEmailIgnoreCase(principal.email());
		return issues.stream()
			.sorted((a, b) -> b.getUpdatedAt().compareTo(a.getUpdatedAt()))
			.toList();
	}

	@PostMapping
	public Issue create(Authentication auth, @Valid @RequestBody CreateIssue req) {
		UserPrincipal principal = requirePrincipal(auth);

		Issue i = new Issue();
		i.setTitle(req.title().trim());
		i.setDescription(req.description().trim());
		i.setCreatedByEmail(principal.email());
		i.setStatus(IssueStatus.OPEN);
		i.setCreatedAt(Instant.now());
		i.setUpdatedAt(Instant.now());
		return repo.save(i);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}/status")
	public Issue setStatus(Authentication auth, @PathVariable Long id, @Valid @RequestBody UpdateStatus req) {
		UserPrincipal principal = requirePrincipal(auth);

		Issue i = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
		i.setStatus(req.status());
		i.setUpdatedAt(Instant.now());

		if (req.status() == IssueStatus.RESOLVED) {
			i.setResolvedByEmail(principal.email());
			i.setResolutionNote(normalizeBlankToNull(req.resolutionNote()));
		}

		return repo.save(i);
	}

	public record CreateIssue(
		@NotBlank @Size(max = 140) String title,
		@NotBlank @Size(max = 5000) String description
	) {}

	public record UpdateStatus(
		@NotNull IssueStatus status,
		@Size(max = 5000) String resolutionNote
	) {}

	private static String normalizeBlankToNull(String s) {
		if (s == null) return null;
		String t = s.trim();
		return t.isEmpty() ? null : t;
	}

	private static UserPrincipal requirePrincipal(Authentication auth) {
		if (auth == null || !(auth.getPrincipal() instanceof UserPrincipal p)) {
			throw new IllegalArgumentException("Unauthorized");
		}
		return p;
	}
}

