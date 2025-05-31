package com.steven.employeeapi.employee;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;


@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {
    private final EmployeeService employeeService;

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        return ResponseEntity.created(URI.create("/employees/userID")).body(employeeService.createEmployee(employee));
    }

    @GetMapping
    public ResponseEntity<Page<Employee>> getEmployees(@RequestParam(value = "page", defaultValue = "0") int page,
                                                       @RequestParam(value = "size", defaultValue = "10") int size) {
        return ResponseEntity.ok().body(employeeService.getAllEmployees(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable(value = "id") String id) {
        return ResponseEntity.ok().body(employeeService.getEmployee(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable(value = "id") String id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok().body("Employee deleted successfully.");
    }

    @PostMapping(value = "{id}/profile-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String>uploadEmployeeProfileImage(@PathVariable("id") String id, @RequestParam("file") MultipartFile file) {
        String profileImageId = employeeService.uploadEmployeeProfileImage(id, file);

        return ResponseEntity.ok().body(profileImageId);
    }

    @GetMapping(value = "{id}/profile-image")
    public byte[] getEmployeeProfileImage(@PathVariable("id") String id) {
        return employeeService.getEmployeeProfileImage(id);
    }

}
