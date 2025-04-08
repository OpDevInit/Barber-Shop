package com.opdevinit.barbershopui.entity;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.Objects;

@Table(name = "SCHEDULES", uniqueConstraints = {
                @UniqueConstraint(name = "UK_SCHEDULE_INTERVAL", columnNames = "start_at, end_at"),
})
@Entity
@Getter
@Setter
@ToString
public class ScheduleEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(nullable = false, name = "start_at")
        private OffsetDateTime startAt;

        @Column(nullable = false, name = "end_at")
        private OffsetDateTime endAt;

        @ToString.Exclude
        @ManyToOne
        @JoinColumn(name = "client_id")
        private ClientEntity client = new ClientEntity();

        

        @Override
        public boolean equals(Object o) {
                if (this == o) return true;
                if (o == null || getClass() != o.getClass()) return false;
                ScheduleEntity that = (ScheduleEntity) o;
                return Objects.equals(id, that.id) &&
                       Objects.equals(startAt, that.startAt) &&
                       Objects.equals(endAt, that.endAt);
        }

        @Override
        public int hashCode() {
                return Objects.hash(id, startAt, endAt);
        }

}
