import { Responsible } from "src/responsible/entities/responsible.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    full_name: string;

    @Column()
    last_name: string;

    @Column()
    admission_number: string;

    @Column()
    academic_year: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date_of_admission: Date; 

    @Column({ nullable: true })
    email_address?: string;

    @Column()
    address: string;

    @Column()
    grado: string;

    @Column()
    salon: string;

    @Column({default: 'pendiente'}) // solicitado, creado // para saber si una familiar esta solicitando una cuenta
    account: string;

    @OneToOne(() => User, { nullable: true })
    @JoinColumn()
    user: User | null;

    @Column({ nullable: true })
    userId?: number;

    @OneToMany(() => Responsible, (studentPerson) => studentPerson.student)
    responsibles: Responsible[];

}
