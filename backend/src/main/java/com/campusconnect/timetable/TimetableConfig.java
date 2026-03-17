package com.campusconnect.timetable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "timetable_config")
public class TimetableConfig {
	@Id
	private Long id = 1L;

	@Column(nullable = false, length = 2_000_000)
	private String imageDataUrl = "";

	@Column(nullable = false)
	private Instant updatedAt = Instant.now();
}

