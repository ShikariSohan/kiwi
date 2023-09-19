package org.aviato.javafest.service;

import org.aviato.javafest.model.Pdf;
import org.aviato.javafest.repository.PdfRepository;
import org.springframework.stereotype.Service;

@Service
public class PdfService {
    private final PdfRepository pdfRepository;
    public PdfService(PdfRepository pdfRepository) {
        this.pdfRepository = pdfRepository;
    }
    public void createPdf(Pdf pdf){
        pdfRepository.insert(pdf);
    }


}
