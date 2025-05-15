import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
@Entity()
export class EstudianteEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  codigoEstudiante: number;
  @Column()
  creditosAprobados: number;
  @Column()
  nombre: string;
  @OneToOne(() => ProyectoEntity, (proyecto) => proyecto.estudiante)
  @JoinColumn()
  proyecto: ProyectoEntity;
}
