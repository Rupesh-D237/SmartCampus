package com.campusconnect.admin;

import com.campusconnect.security.UserPrincipal;
import com.campusconnect.user.Role;
import com.campusconnect.user.UserAccount;
import com.campusconnect.user.UserAccountRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {
	private final UserAccountRepository users;

	@GetMapping
	public List<UserSummary> list() {
		return users.findAll().stream()
			.sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
			.map(UserSummary::from)
			.toList();
	}

	@PatchMapping("/{id}/enabled")
	public UserSummary setEnabled(@PathVariable Long id, @Valid @RequestBody SetEnabledRequest req, Authentication auth) {
		UserAccount u = users.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));

		boolean enabled = Boolean.TRUE.equals(req.enabled());
		if (auth != null && auth.getPrincipal() instanceof UserPrincipal principal) {
			if (principal.id().equals(u.getId()) && !enabled) {
				throw new IllegalArgumentException("You cannot disable your own account");
			}
		}

		u.setEnabled(enabled);
		return UserSummary.from(users.save(u));
	}

	@PatchMapping("/{id}/roles")
	public UserSummary setRoles(@PathVariable Long id, @Valid @RequestBody SetRolesRequest req, Authentication auth) {
		UserAccount u = users.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));

		if (auth != null && auth.getPrincipal() instanceof UserPrincipal principal) {
			if (principal.id().equals(u.getId()) && !req.roles().contains(Role.ADMIN)) {
				throw new IllegalArgumentException("You cannot remove ADMIN from your own account");
			}
		}

		u.setRoles(req.roles());
		return UserSummary.from(users.save(u));
	}

	public record SetEnabledRequest(@NotNull Boolean enabled) {}

	public record SetRolesRequest(@NotNull Set<Role> roles) {}

	public record UserSummary(Long id, String email, boolean enabled, Set<Role> roles, Instant createdAt) {
		static UserSummary from(UserAccount u) {
			return new UserSummary(u.getId(), u.getEmail(), u.isEnabled(), u.getRoles(), u.getCreatedAt());
		}
	}
}

