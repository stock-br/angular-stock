import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  public products = [
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

  public ELEMENT_DATA: Product[] = [];

  public dataSource: any = null;

  public displayedColumns: string[] = [
    'nome',
    'criacao',
    'atualizacao',
    'actions',
  ];

  public searchTextToFilter: string = '';

  constructor(
    private toastr: ToastrService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe(
      (response: Product) => {
        this.dataSource = response;
      },
      (error) => {
        this.toastr.error('Erro ao carregar produtos.', 'Erro!');
      }
    );
  }

  openProduct(product: Product) {
    this.router.navigate([`produtos/editar-produto/${product._id}`]);
  }

  deleteProduct(product: Product) {
    this.productsService.deleteProduct(product).subscribe(
      (response) => {
        this.toastr.success(
          `Produto deletado com sucesso.`,
          'Produto deletado!'
        );
        this.getProducts();
      },
      (error) => {
        this.toastr.success(`Erro ao deletar produto.`, 'Erro!');
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
