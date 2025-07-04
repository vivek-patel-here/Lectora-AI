# Use Eclipse Temurin OpenJDK image
FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY run_code.sh .
RUN chmod +x run_code.sh

CMD ["./run_code.sh"]