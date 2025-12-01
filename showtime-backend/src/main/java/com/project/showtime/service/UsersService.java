package com.project.showtime.service;

import com.project.showtime.exception.CrudOperationException;
import com.project.showtime.exception.CrudValidationException;
import com.project.showtime.model.MoviesModel;
import com.project.showtime.model.UserModel;
import com.project.showtime.repository.UsersRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    private Logger log = LogManager.getLogger(UsersService.class);

    @Autowired
    private Validator validator;

    private void checkForNull(UserModel userModel) {
        if(userModel == null) {
            throw CrudOperationException.asNullEntity(MoviesModel.class);
        }
    }

    private void checkId(Long id) throws CrudValidationException {
        if(id<=0){
            throw CrudValidationException.asInvalidEntityId(UserModel.class);
        }
    }

    private void validate(UserModel userModel) throws CrudValidationException {
        Set<ConstraintViolation<UserModel>> violations = validator.validate(userModel);
        if(!violations.isEmpty()){
            throw CrudValidationException.asFailedValidationOperation(MoviesModel.class, violations);
        }
    }

    private UserModel saveUser(UserModel user) throws CrudOperationException{
        try{
            boolean isNew = (user.getUserId() == null);
            UserModel savedModel = usersRepository.save(user);
            log.info((isNew ? "Added" : "Updated") + " UserModel with ID: " + savedModel.getUserId());
            return savedModel;
        }catch (Exception e) {
            throw CrudOperationException.asFailedAddOperation(MoviesModel.class, e);
        }
    }

    //Get all the users
    public List<UserModel> getAllUsers(){
        try{
            return usersRepository.findAll();
        } catch (Exception e) {
            throw CrudOperationException.asFailedGetOperation(UserModel.class, e);
        }
    }
}
