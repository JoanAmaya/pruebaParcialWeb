import { PropuestaEntity } from 'src/propuesta/propuesta.entity/propuesta.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
@Entity()
export class ProfesorEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  cedula: number;
  @Column()
  nombre: string;
  @Column()
  grupoInvestigacion: string;
  @Column()
  numeroExtension: number;
  @OneToMany(() => PropuestaEntity, (propuesta) => propuesta.profesor)
  propuestas: PropuestaEntity[];
}
