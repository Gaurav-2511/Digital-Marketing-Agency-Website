	package com.digitalmarketing.backend.service.impl;
	
	import java.util.List;
	import java.util.stream.Collectors;
	
	import org.springframework.stereotype.Service;
	import org.springframework.transaction.annotation.Transactional;
	
	import com.digitalmarketing.backend.dto.request.PortfolioRequest;
	import com.digitalmarketing.backend.dto.response.PortfolioResponse;
	import com.digitalmarketing.backend.entity.Portfolio;
	import com.digitalmarketing.backend.exception.ResourceNotFoundException;
	import com.digitalmarketing.backend.repository.PortfolioRepository;
	import com.digitalmarketing.backend.service.PortfolioService;
	
	@Service
	@Transactional
	public class PortfolioServiceImpl implements PortfolioService {
	
		private final PortfolioRepository portfolioRepository;
	
		public PortfolioServiceImpl(PortfolioRepository portfolioRepository) {
			this.portfolioRepository = portfolioRepository;
		}
	
		@Override
		public PortfolioResponse createPortfolio(PortfolioRequest request) {
	
			if (portfolioRepository.existsBySlug(request.getSlug())) {
				throw new IllegalArgumentException("Portfolio with slug '" + request.getSlug() + "' already exists");
			}
	
			Portfolio portfolio = new Portfolio();
	
			mapRequestToEntity(request, portfolio);
	
			Portfolio savedPortfolio = portfolioRepository.save(portfolio);
	
			return mapEntityToResponse(savedPortfolio);
		}
	
		@Override
		@Transactional(readOnly = true)
		public List<PortfolioResponse> getAllPortfolios() {
	
			return portfolioRepository.findAll()
					.stream()
					.map(this::mapEntityToResponse)
					.collect(Collectors.toList());
		}
	
		@Override
		@Transactional(readOnly = true)
		public PortfolioResponse getPortfolioById(Long id) {
	
			Portfolio portfolio = portfolioRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Portfolio not found with id: " + id));
	
			return mapEntityToResponse(portfolio);
		}
	
		@Override
		@Transactional(readOnly = true)
		public PortfolioResponse getActivePortfolioById(Long id) {
	
			Portfolio portfolio = portfolioRepository.findByIdAndActiveTrue(id)
					.orElseThrow(() -> new ResourceNotFoundException("Active portfolio not found with id: " + id));
	
			return mapEntityToResponse(portfolio);
		}
	
		@Override
		public PortfolioResponse updatePortfolio(Long id, PortfolioRequest request) {
	
			Portfolio portfolio = portfolioRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Portfolio not found with id: " + id));
	
			if (!portfolio.getSlug().equals(request.getSlug()) && portfolioRepository.existsBySlug(request.getSlug())) {
	
				throw new IllegalArgumentException("Portfolio with slug '" + request.getSlug() + "' already exists");
			}
	
			mapRequestToEntity(request, portfolio);
	
			Portfolio updatedPortfolio = portfolioRepository.save(portfolio);
	
			return mapEntityToResponse(updatedPortfolio);
		}
	
		@Override
		public void deletePortfolio(Long id) {
	
			Portfolio portfolio = portfolioRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Portfolio not found with id: " + id));
	
			portfolioRepository.delete(portfolio);
		}
	
		@Override
		public PortfolioResponse updatePortfolioStatus(Long id, boolean active) {
	
			Portfolio portfolio = portfolioRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Portfolio not found with id: " + id));
	
			portfolio.setActive(active);
	
			Portfolio updatedPortfolio = portfolioRepository.save(portfolio);
	
			return mapEntityToResponse(updatedPortfolio);
		}
	
		@Override
		@Transactional(readOnly = true)
		public List<PortfolioResponse> getActivePortfolios() {
	
			return portfolioRepository.findByActiveTrue().stream().map(this::mapEntityToResponse)
					.collect(Collectors.toList());
		}
	
		@Override
		@Transactional(readOnly = true)
		public PortfolioResponse getPortfolioBySlug(String slug) {
	
			Portfolio portfolio = portfolioRepository.findBySlugAndActiveTrue(slug)
					.orElseThrow(() -> new ResourceNotFoundException("Active portfolio not found with slug: " + slug));
	
			return mapEntityToResponse(portfolio);
		}
	
		@Override
		@Transactional(readOnly = true)
		public List<PortfolioResponse> getPortfoliosByCategory(String category) {
	
			return portfolioRepository.findByCategoryAndActiveTrue(category).stream().map(this::mapEntityToResponse)
					.collect(Collectors.toList());
		}
	
		private void mapRequestToEntity(PortfolioRequest request, Portfolio portfolio) {
	
			portfolio.setTitle(request.getTitle());
			portfolio.setSlug(request.getSlug());
			portfolio.setShortDescription(request.getShortDescription());
			portfolio.setDescription(request.getDescription());
			portfolio.setClientName(request.getClientName());
			portfolio.setCategory(request.getCategory());
			portfolio.setImageUrl(request.getImageUrl());
			portfolio.setProjectUrl(request.getProjectUrl());
			portfolio.setActive(request.getActive());
		}
	
		private PortfolioResponse mapEntityToResponse(Portfolio portfolio) {
	
			return new PortfolioResponse(portfolio.getId(), portfolio.getTitle(), portfolio.getSlug(),
					portfolio.getShortDescription(), portfolio.getDescription(), portfolio.getClientName(),
					portfolio.getCategory(), portfolio.getImageUrl(), portfolio.getProjectUrl(), portfolio.isActive(),
					portfolio.getCreatedAt(), portfolio.getUpdatedAt());
		}
	
	}