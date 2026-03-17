package com.campusconnect.issue;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "issues")
public class Issue {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 140)
	private String title;

	@Column(nullable = false, length = 5000)
	private String description;

	@Column(nullable = false)
	private String createdByEmail;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private IssueStatus status = IssueStatus.OPEN;

	@Column(nullable = true)
	private String resolvedByEmail;

	@Column(nullable = true, length = 5000)
	private String resolutionNote;

	@Column(nullable = false)
	private Instant createdAt = Instant.now();

	@Column(nullable = false)
	private Instant updatedAt = Instant.now();
}

