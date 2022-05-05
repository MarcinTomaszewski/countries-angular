export interface Country {
  id?: number;
  capital: string;
  name: string;
  region: string;
  population: number;
  flag: string;
  cities: City[];
  nativeName: string;
  alpha2Code: string;
  alpha3Code: string;
  numericCode: string;
  favorite: boolean;
}
export interface City {
  name: string;
}
export const countries = [
  {
    name: 'Afghanistan',
    region: 'Asia',
    population: 40218234,
    flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg',
  },
  {
    name: 'Åland Islands',
    region: 'Europe',
    population: 28875,
    flag: 'https://flagcdn.com/ax.svg',
  },
  {
    name: 'Albania',
    region: 'Europe',
    population: 2837743,
    flag: 'https://flagcdn.com/al.svg',
  },
  {
    name: 'Algeria',
    region: 'Africa',
    population: 44700000,
    flag: 'https://flagcdn.com/dz.svg',
  },
  {
    name: 'American Samoa',
    region: 'Oceania',
    population: 55197,
    flag: 'https://flagcdn.com/as.svg',
  },
  {
    name: 'Andorra',
    region: 'Europe',
    population: 77265,
    flag: 'https://flagcdn.com/ad.svg',
  },
  {
    name: 'Angola',
    region: 'Africa',
    population: 32866268,
    flag: 'https://flagcdn.com/ao.svg',
  },
  {
    name: 'Anguilla',
    region: 'Americas',
    population: 13452,
    flag: 'https://flagcdn.com/ai.svg',
  },
  {
    name: 'Antarctica',
    region: 'Polar',
    population: 1000,
    flag: 'https://flagcdn.com/aq.svg',
  },
  {
    name: 'Antigua and Barbuda',
    region: 'Americas',
    population: 97928,
    flag: 'https://flagcdn.com/ag.svg',
  },
  {
    name: 'Afghanistan',
    region: 'Asia',
    population: 40218234,
    flag: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg',
  },
  {
    name: 'Åland Islands',
    region: 'Europe',
    population: 28875,
    flag: 'https://flagcdn.com/ax.svg',
  },
  {
    name: 'Albania',
    region: 'Europe',
    population: 2837743,
    flag: 'https://flagcdn.com/al.svg',
  },
  {
    name: 'Algeria',
    region: 'Africa',
    population: 44700000,
    flag: 'https://flagcdn.com/dz.svg',
  },
  {
    name: 'American Samoa',
    region: 'Oceania',
    population: 55197,
    flag: 'https://flagcdn.com/as.svg',
  },
  {
    name: 'Andorra',
    region: 'Europe',
    population: 77265,
    flag: 'https://flagcdn.com/ad.svg',
  },
  {
    name: 'Angola',
    region: 'Africa',
    population: 32866268,
    flag: 'https://flagcdn.com/ao.svg',
  },
  {
    name: 'Anguilla',
    region: 'Americas',
    population: 13452,
    flag: 'https://flagcdn.com/ai.svg',
  },
  {
    name: 'Antarctica',
    region: 'Polar',
    population: 1000,
    flag: 'https://flagcdn.com/aq.svg',
  },
  {
    name: 'Antigua and Barbuda',
    region: 'Americas',
    population: 97928,
    flag: 'https://flagcdn.com/ag.svg',
  },
];
