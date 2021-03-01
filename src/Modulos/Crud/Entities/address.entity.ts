import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Client from './client.entity';

@Entity('PVDA.TCLIENTE_E')
export default class Address {
  @PrimaryColumn()
  CLIE_ID: number;

  @Column()
  CLIE_CLI_ID: number;

  @Column('varchar2', { length: 1 })
  CLIE_TIPO: string;

  @Column('varchar2', { length: 15 })
  CLIE_CEP: string;

  @Column('varchar2', { length: 90 })
  CLIE_ENDERECO: string;

  @Column('varchar2', { length: 50 })
  CLIE_BAIRRO: string;

  @Column('varchar2', { length: 50 })
  CLIE_CIDADE: string;

  @Column('varchar2', { length: 2 })
  CLIE_UF: string;

  @ManyToOne(() => Client, (cli) => cli.CLIENTE_E, { cascade: true })
  @JoinColumn({ name: 'CLIE_CLI_ID', referencedColumnName: 'CLI_ID' })
  OWNER: Client; // Nome do Relacionamento com a Cliente nesta tabelas
}
