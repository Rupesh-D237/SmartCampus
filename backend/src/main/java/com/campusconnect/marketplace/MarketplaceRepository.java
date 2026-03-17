package com.campusconnect.marketplace;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MarketplaceRepository extends JpaRepository<MarketplaceListing, Long> {}

