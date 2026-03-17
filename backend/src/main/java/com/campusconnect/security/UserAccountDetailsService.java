package com.campusconnect.security;

import com.campusconnect.user.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAccountDetailsService implements UserDetailsService {
	private final UserAccountRepository users;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return users.findByEmailIgnoreCase(username)
			.map(UserPrincipal::new)
			.orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}
}

