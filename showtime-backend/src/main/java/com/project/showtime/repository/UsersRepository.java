package com.project.showtime.repository;

import com.project.showtime.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<UserModel, Long> {

    
} 
