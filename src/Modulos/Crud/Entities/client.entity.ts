import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
  getManager,
} from 'typeorm';
import Endereco from './address.entity';
import { normalizeDate } from './../../../utils/normalizeEnties';

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

  @BeforeInsert()
  async setNewId() {
    const newId = await getManager().query(
      `SELECT MAX(CLI_ID) + 1 as id FROM PVDA.TCLIENTE`,
    );
    this.CLI_ID = newId[0].ID === null ? 1 : newId[0].ID;
    this.CLI_DATACAD = normalizeDate(new Date().toLocaleDateString());
  }
}
