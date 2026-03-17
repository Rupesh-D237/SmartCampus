package com.campusconnect.marketplace;

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
@Table(name = "marketplace_listings")
public class MarketplaceListing {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String item;

	@Column(nullable = false)
	private String priceLabel;

	@Column(nullable = false, length = 5000)
	private String details;

	@Column(nullable = false)
	private Instant createdAt = Instant.now();
}

