package com.example.eventfireback.repository;

import com.example.eventfireback.model.ERole;
import com.example.eventfireback.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
