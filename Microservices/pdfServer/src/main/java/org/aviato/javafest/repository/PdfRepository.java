package org.aviato.javafest.repository;

import org.aviato.javafest.model.Pdf;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PdfRepository extends MongoRepository<Pdf,String> {

    List<Pdf> findAllByUserId(String userid);
}
