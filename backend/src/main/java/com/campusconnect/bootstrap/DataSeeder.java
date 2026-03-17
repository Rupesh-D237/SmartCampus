package com.campusconnect.bootstrap;

import com.campusconnect.announcement.Announcement;
import com.campusconnect.announcement.AnnouncementRepository;
import com.campusconnect.event.Event;
import com.campusconnect.event.EventRepository;
import com.campusconnect.lostfound.LostFoundItem;
import com.campusconnect.lostfound.LostFoundRepository;
import com.campusconnect.marketplace.MarketplaceListing;
import com.campusconnect.marketplace.MarketplaceRepository;
import com.campusconnect.user.Role;
import com.campusconnect.user.UserAccount;
import com.campusconnect.user.UserAccountRepository;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
	private final UserAccountRepository users;
	private final PasswordEncoder passwordEncoder;
	private final AnnouncementRepository announcements;
	private final EventRepository events;
	private final LostFoundRepository lostFound;
	private final MarketplaceRepository marketplace;

	@Override
	public void run(String... args) {
		seedUsers();
		seedAnnouncements();
		seedEvents();
		seedLostFound();
		seedMarketplace();
	}

	private void seedUsers() {
		if (!users.existsByEmailIgnoreCase("sanjay.cse@sairam.edu")) {
			UserAccount u = new UserAccount();
			u.setEmail("sanjay.cse@sairam.edu");
			u.setPasswordHash(passwordEncoder.encode("password123"));
			u.setRoles(Set.of(Role.STUDENT));
			u.setEnabled(true);
			users.save(u);
		}

		if (!users.existsByEmailIgnoreCase("admin@campusconnect.local")) {
			UserAccount admin = new UserAccount();
			admin.setEmail("admin@campusconnect.local");
			admin.setPasswordHash(passwordEncoder.encode("admin123"));
			admin.setRoles(Set.of(Role.ADMIN));
			admin.setEnabled(true);
			users.save(admin);
		}
	}

	private void seedAnnouncements() {
		if (announcements.count() > 0) return;

		Announcement a1 = new Announcement();
		a1.setTitle("Internal Exam Schedule Released");
		a1.setMessage("The internal exams for CSE 2nd year will start from April 10. Students must check the timetable.");
		a1.setPostedBy("Dr. Priya Raman");

		Announcement a2 = new Announcement();
		a2.setTitle("Hackathon Registration Open");
		a2.setMessage("Students can register for the Sairam Tech Hackathon.");
		a2.setPostedBy("CSE Department Office");

		Announcement a3 = new Announcement();
		a3.setTitle("Placement Training Session");
		a3.setMessage("Placement training will be conducted in Seminar Hall 2.");
		a3.setPostedBy("Placement Cell");

		announcements.save(a1);
		announcements.save(a2);
		announcements.save(a3);
	}

	private void seedEvents() {
		if (events.count() > 0) return;

		Event e1 = new Event();
		e1.setTitle("Sairam Tech Hackathon 2026");
		e1.setDateLabel("April 15");
		e1.setLocation("Innovation Lab");
		e1.setDescription("24-hour coding competition for AI and web development.");

		Event e2 = new Event();
		e2.setTitle("AI Workshop");
		e2.setDateLabel("April 5");
		e2.setLocation("CSE Lab 3");
		e2.setDescription("Hands-on workshop on machine learning.");

		events.save(e1);
		events.save(e2);
	}

	private void seedLostFound() {
		if (lostFound.count() > 0) return;

		LostFoundItem l1 = new LostFoundItem();
		l1.setItem("Scientific Calculator");
		l1.setDetails("Found near CSE Lab 2.");

		LostFoundItem l2 = new LostFoundItem();
		l2.setItem("Black Backpack");
		l2.setDetails("Lost near library.");

		lostFound.save(l1);
		lostFound.save(l2);
	}

	private void seedMarketplace() {
		if (marketplace.count() > 0) return;

		MarketplaceListing p1 = new MarketplaceListing();
		p1.setItem("Data Structures Textbook");
		p1.setPriceLabel("₹400");
		p1.setDetails("Condition: Good");

		MarketplaceListing p2 = new MarketplaceListing();
		p2.setItem("Laptop Stand");
		p2.setPriceLabel("₹500");
		p2.setDetails("Adjustable aluminium stand.");

		marketplace.save(p1);
		marketplace.save(p2);
	}
}

