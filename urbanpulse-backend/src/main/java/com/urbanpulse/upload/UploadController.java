package com.urbanpulse.upload;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/uploads")
@CrossOrigin("*")
public class UploadController {

    @PostMapping
    public String uploadImage(
            @RequestParam("file")
            MultipartFile file)
            throws IOException {

        String fileName =
                UUID.randomUUID()
                        + "_"
                        + file.getOriginalFilename();

        String uploadDir =
                System.getProperty("user.dir")
                        + "/uploads/";;

        File directory =
                new File(uploadDir);

        if (!directory.exists()) {

            directory.mkdirs();

        }

        file.transferTo(
                new File(
                        uploadDir + fileName
                )
        );

        return "http://localhost:8080/uploads/"
                + fileName;
    }
}
