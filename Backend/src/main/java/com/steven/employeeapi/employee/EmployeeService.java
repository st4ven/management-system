package com.steven.employeeapi.employee;

import com.steven.employeeapi.s3.S3Buckets;
import com.steven.employeeapi.s3.S3Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
@Slf4j
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;

    public Page<Employee> getAllEmployees(int page, int size) {
        return employeeRepository.findAll(PageRequest.of(page, size, Sort.by("name")));
    }

    public Employee getEmployee(String id) {
        return employeeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(String id) {
        Employee employee = getEmployee(id);

        // get the image ID currently
        String profileImageId = employee.getProfile_image_id();

        // get the key
        String key = "profile-images/%s/%s".formatted(id, profileImageId);

        // delete the image from the bucket
        s3Service.deleteObject(s3Buckets.getEmployee(), key);

        // delete the employee
        employeeRepository.delete(employee);
    }

    public String uploadEmployeeProfileImage(String id, MultipartFile file) {
        // get the employee from the ID
        Employee employee = getEmployee(id);

        // get the image ID currently
        String oldImageId = employee.getProfile_image_id();

        // if it exists, delete it from the bucket
        if (oldImageId != null && !oldImageId.isEmpty()) {
            String oldImageKey = "profile-images/%s/%s".formatted(id, oldImageId);
            s3Service.deleteObject(s3Buckets.getEmployee(), oldImageKey);
        }

        try {
            // generate a random image ID
            String newImageId = UUID.randomUUID().toString();

            // put the object into the S3 bucket
            s3Service.putObject(
                    s3Buckets.getEmployee(),
                    "profile-images/%s/%s".formatted(id, newImageId),
                    file.getBytes());

            // set the profile image ID and save the employee
            employee.setProfile_image_id(newImageId);
            employeeRepository.save(employee);

            return newImageId;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    public byte[] getEmployeeProfileImage(String id) {
        // get the employee
        Employee employee = getEmployee(id);

        // get the profile image ID
        String profileImageId = employee.getProfile_image_id();

        // check if it is null or empty
        if (profileImageId == null || profileImageId.isBlank()) {
            throw new IllegalStateException("Employee does not have a profile image");
        }

        // return the image
        return s3Service.getObject(
                s3Buckets.getEmployee(),
                "profile-images/%s/%s".formatted(id, profileImageId)
        );
    }
}
