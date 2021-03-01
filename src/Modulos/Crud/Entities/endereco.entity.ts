import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Cliente from './cliente.entity';

@Entity('TCLIENTE_E')
export default class Endereco {
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

  @ManyToOne(() => Cliente, (cli) => cli.CLIENTE_E, { cascade: true })
  @JoinColumn({ name: 'CLIE_CLI_ID', referencedColumnName: 'CLI_ID' })
  OWNER: Cliente; // Nome do Relacionamento com a Cliente nesta tabelas
}
