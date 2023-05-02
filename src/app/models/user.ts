export class User {
  constructor(
    //public id: number,
    public nickname: string="",
    public age: Date= new Date,
    public nationality: string="",
    public short_description: string="",
    public email: string="",
    public passwd: string="",
    public id_availability: number|null=null,
    public id_first_character: number | null=null,
    public id_second_character: number | null=null,
    public id_third_character: number | null=null,
    public id_rank: number|null=null,
    public id_ambition: number|null=null,
    public id_srole: number|null=null,
    public id_trole: number|null=null
  ) {}
}
