FROM postgres:17.3-alpine

# Copy the personalized file settings
COPY postgresql.conf /

# Copy personalized file to path of postgres
COPY postgresql.conf /etc/postgresql/postgresql.conf

# Set the default user and password
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres_reservalab

# Create a new Database
ENV POSTGRES_DB=reservalab-development

# Expose the PostgresSQL port
EXPOSE 5432

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"]
