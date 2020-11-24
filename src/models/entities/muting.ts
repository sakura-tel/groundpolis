import { PrimaryColumn, Entity, Index, JoinColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';
import { id } from '../id';

@Entity()
@Index(['muterId', 'muteeId'], { unique: true })
export class Muting {
	@PrimaryColumn(id())
	public id: string;

	@Index()
	@Column('timestamp with time zone', {
		comment: 'The created date of the Muting.'
	})
	public createdAt: Date;

	@Index()
	@Column({
		...id(),
		comment: 'The mutee user ID.'
	})
	public muteeId: User['id'];

	@ManyToOne(type => User, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	public mutee: User | null;

	@Index()
	@Column({
		...id(),
		comment: 'The muter user ID.'
	})
	public muterId: User['id'];

	@Column({
		comment: 'Mute only reposts'
	})
	public isRenoteOnly: boolean;
	
	@ManyToOne(type => User, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	public muter: User | null;
}
