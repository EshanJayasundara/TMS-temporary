# TMS-temporary
Training Management System

### Application.properties
```
spring.datasource.url=jdbc:mysql://localhost:3306/moodle_db
spring.datasource.username=root
spring.datasource.password=

spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=jmeshangj@gmail.com
spring.mail.password=
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

app.auth.cors.allowedOrigins=http://localhost:3000,http://localhost:8080

#Google Login
spring.security.oauth2.client.registration.google.client-id=
spring.security.oauth2.client.registration.google.client-secret=

#Github Login
spring.security.oauth2.client.registration.github.client-id=
spring.security.oauth2.client.registration.github.client-secret=

logging.level.org.springframework.security=TRACE
```
