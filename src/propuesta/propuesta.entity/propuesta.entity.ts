import { ProfesorEntity } from 'src/profesor/profesor.entity/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity/proyecto.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
@Entity()
export class PropuestaEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  titulo: string;
  @Column()
  descripcion: string;
  @Column()
  palabraClave: string;
  @OneToOne(() => ProyectoEntity, (proyecto) => proyecto.propuesta)
  @JoinColumn()
  proyecto: ProyectoEntity;

  @ManyToOne(() => ProfesorEntity, (profesor) => profesor.propuestas)
  profesor: ProfesorEntity;
}
