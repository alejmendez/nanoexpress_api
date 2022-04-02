export default class PersonResponse {
  id: string;
  dni: string;
  first_name: string;
  last_name: string;
  avatar: string;
  birthday: Date;
  room_telephone: string;
  mobile_phone: string;
  website: string;
  languages: string;
  email: string;
  nationality: string;
  gender: string;
  civil_status: string;
  contact_options: string;
  address: string;
  address2: string;
  postcode: string;
  city: string;
  state: string;
  country: string;
  number_children: number;
  observation: string;
  about: string;
  blood_type: string;

  constructor(data: any) {
    this.id = data.id;
    this.dni = data.dni;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.avatar = data.avatar;
    this.birthday = data.birthday;
    this.room_telephone = data.room_telephone;
    this.mobile_phone = data.mobile_phone;
    this.website = data.website;
    this.languages = data.languages;
    this.email = data.email;
    this.nationality = data.nationality;
    this.gender = data.gender;
    this.civil_status = data.civil_status;
    this.contact_options = data.contact_options;
    this.address = data.address;
    this.address2 = data.address2;
    this.postcode = data.postcode;
    this.city = data.city;
    this.state = data.state;
    this.country = data.country;
    this.number_children = data.number_children;
    this.observation = data.observation;
    this.about = data.about;
    this.blood_type = data.blood_type;
  }
}
