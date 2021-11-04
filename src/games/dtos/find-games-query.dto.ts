import { BaseQueryParametersDto } from "src/shared/base-query-parameters.dto";

export class FindGamesQueryDto extends BaseQueryParametersDto {
  name: string;
  imagem: string;
  data_lancamento: string;
  bio: string;
}