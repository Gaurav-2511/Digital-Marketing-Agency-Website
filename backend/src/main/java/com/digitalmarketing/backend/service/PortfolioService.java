package com.digitalmarketing.backend.service;

import java.util.List;

import com.digitalmarketing.backend.dto.request.PortfolioRequest;
import com.digitalmarketing.backend.dto.response.PortfolioResponse;

public interface PortfolioService {

    PortfolioResponse createPortfolio(PortfolioRequest request);

    List<PortfolioResponse> getAllPortfolios();

    PortfolioResponse getPortfolioById(Long id);
    
    PortfolioResponse getActivePortfolioById(Long id);

    PortfolioResponse updatePortfolio(Long id, PortfolioRequest request);

    void deletePortfolio(Long id);

    PortfolioResponse updatePortfolioStatus(Long id, boolean active);

    List<PortfolioResponse> getActivePortfolios();

    PortfolioResponse getPortfolioBySlug(String slug);

    List<PortfolioResponse> getPortfoliosByCategory(String category);
}
