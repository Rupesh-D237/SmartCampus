package com.campusconnect.lostfound;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LostFoundRepository extends JpaRepository<LostFoundItem, Long> {}

