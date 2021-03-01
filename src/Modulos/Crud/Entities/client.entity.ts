import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import Endereco from './address.entity';

@Entity('PVDA.TCLIENTE')
export default class Client {
  @PrimaryGeneratedColumn()
  CLI_ID: number;

  @Column('varchar2', { length: 20 })
  CLI_CNPJ_CPF: string;

  @Column('varchar2', { length: 70 })
  CLI_NOME: string;

  @Column({ type: 'timestamp', nullable: false })
  CLI_DATACAD: Date;

  @Column({ type: 'timestamp', nullable: false })
  CLI_DATANASC: Date;

  @Column('varchar2', { length: 15 })
  CLI_FONE: string;

  // Campo na tabela do relacionamento inverso no Model
  @OneToMany(() => Endereco, (endereco) => endereco.OWNER)
  @JoinColumn({ name: 'CLIE_CLI_ID', referencedColumnName: 'CLI_ID' })
  CLIENTE_E: Endereco[]; // Nome do relacinamento com Endereços
}
