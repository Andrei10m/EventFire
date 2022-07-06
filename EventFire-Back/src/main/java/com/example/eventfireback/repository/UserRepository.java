package com.example.eventfireback.repository;

import java.util.Optional;

import com.example.eventfireback.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    User findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    @Query(value = "select * from users where id = ?1",nativeQuery = true)
    User getByUserId(Long userId);
}

