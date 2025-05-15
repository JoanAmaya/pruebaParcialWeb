import { EstudianteEntity } from 'src/estudiante/estudiante.entity/estudiante.entity';
import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToOne } from 'typeorm';
@Entity()
export class ProyectoEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  fechaInicio: Date;
  @Column()
  fechaFin: Date;
  @Column()
  url: string;
  @OneToOne(() => PropuestaEntity, (propuesta) => propuesta.proyecto)
  propuesta: PropuestaEntity;
  @OneToOne(() => EstudianteEntity, (estudiante) => estudiante.proyecto)
  estudiante: EstudianteEntity;
}
