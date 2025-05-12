FROM postgres:17.3-alpine

# Copia a configuração para o local correto
COPY postgresql.conf /etc/postgresql/postgresql.conf

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres_reservalab
ENV POSTGRES_DB=reservalab-development

EXPOSE 5432

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
