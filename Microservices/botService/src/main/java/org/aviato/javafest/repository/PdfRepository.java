package org.aviato.javafest.repository;

import org.aviato.javafest.model.Pdf;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PdfRepository extends MongoRepository<Pdf,String> {
}
