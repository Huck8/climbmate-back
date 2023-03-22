import mongoose, { Schema } from 'mongoose';
// Aimport { User } from '../users/user-schema';

export interface Excursion {
  imgExcursion: string;
  nameExcursion: string;
  date: Date;
  difficultyLevel: string;
  needEquipment: boolean;
}

const excursionSchema = new Schema<Excursion>({
  imgExcursion: String,
  nameExcursion: String,
  date: Date,
  difficultyLevel: String,
  needEquipment: Boolean,
  // Auser: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const ExcursionModel = mongoose.model<Excursion>(
  'Excursion',
  excursionSchema,
  'excursions',
);
