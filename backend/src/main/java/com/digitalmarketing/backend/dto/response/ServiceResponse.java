package com.digitalmarketing.backend.dto.response;

import java.time.LocalDateTime;

import com.digitalmarketing.backend.entity.Service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceResponse {

	private Long id;
    private String title;
    private String slug;
    private String shortDescription;
    private String description;
    private String icon;
    private String imageUrl;
    private boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;	

    public static ServiceResponse fromEntity(Service service) {
        return new ServiceResponse(
                service.getId(),
                service.getTitle(),
                service.getSlug(),
                service.getShortDescription(),
                service.getDescription(),
                service.getIcon(),
                service.getImageUrl(),
                service.isActive(),
                service.getCreatedAt(),
                service.getUpdatedAt()
        );
    }
}
