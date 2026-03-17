package com.campusconnect.lostfound;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "lost_found_items")
public class LostFoundItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String item;

	@Column(nullable = true, length = 5000)
	private String details;

	@Column(nullable = true, length = 8_000_000)
	private String imageDataUrl;

	@Column(nullable = false)
	private Instant createdAt = Instant.now();
}

