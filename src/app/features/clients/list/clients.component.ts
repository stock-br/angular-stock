import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client, ClientsService } from '../clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  public clients = [
    {
      nome: 'Camiseta',
      modelo: [
        {
          descricao: 'Cor: Preta, Tamanho: G, Manga: Longa, Gola: V',
          quantidadeMinima: 5,
          quantidadeAtual: 10,
          valorVenda: 75,
          valorCusto: 50,
        },
      ],
    },
  ];

  public ELEMENT_DATA: Client[] = [];

  public dataSource: any = null;

  public displayedColumns: string[] = [
    'nome',
    'email',
    'atualizacao',
    'actions',
  ];

  public searchTextToFilter: string = '';

  constructor(
    private toastr: ToastrService,
    private clientsService: ClientsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.clientsService.getClients().subscribe(
      (response: Client) => {
        this.dataSource = response;
      },
      (error) => {
        this.toastr.error('Erro ao carregar clientes.', 'Erro!');
      }
    );
  }

  openClient(client: Client) {
    this.router.navigate([`clientes/editar-cliente/${client._id}`]);
  }

  deleteClient(client: Client) {
    this.clientsService.deleteClient(client).subscribe(
      (response) => {
        this.toastr.success(
          `Cliente deletado com sucesso.`,
          'Cliente deletado!'
        );
        this.getClients();
      },
      (error) => {
        this.toastr.success(`Erro ao deletar cliente.`, 'Erro!');
      }
    );
  }

  // Filter Section
  searchUsers() {
    // this.getAllUsers();
  }

  searchOnKeyUp(e: any) {
    let key = e.which || e.keyCode;
    if (key == 13) {
      this.searchUsers();
    }
  }

  resetFilters() {
    this.searchTextToFilter = '';

    // this.getAllUsers();
  }
}
