import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Model, Product, ProductsService } from '../products.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss'],
})
export class ManageProductComponent implements OnInit {
  public isEdition: boolean = false;
  public productIdLoaded: any;
  public productLoaded: any;
  public productForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    createdAt: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    updatedAt: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    models: new FormArray([], Validators.required),
  });

  public isLoaded: boolean = false;

  constructor(
    private activedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.productIdLoaded = params['id'];

      if (this.productIdLoaded) {
        this.isEdition = true;
        this.loadProduct(this.productIdLoaded);
      } else {
        this.isLoaded = true;
      }
    });
  }

  loadProduct(id: string | number) {
    this.productsService.getProductById(this.productIdLoaded).subscribe(
      (response: Product[]) => {
        this.isLoaded = true;
        this.productLoaded = response[0];
        this.fillProduct(this.productLoaded);
      },
      (error) => {
        this.toastr.error(`Erro ao carregar produto: ${id}`, 'Erro!');
      }
    );
  }

  fillProduct(product: Product) {
    this.productForm.patchValue({
      name: product.name,
      createdAt: product.createdAt?.slice(0, 16),
      updatedAt: product.updatedAt?.slice(0, 16),
    });

    this.fillModels(product.models);
  }

  get models(): FormArray {
    return this.productForm.get('models') as FormArray;
  }

  addModel() {
    let model: FormGroup = new FormGroup({
      description: new FormControl('', Validators.required),
      costValue: new FormControl(null, Validators.required),
      saleValue: new FormControl(null, Validators.required),
      minimumAmount: new FormControl(null, Validators.required),
    });

    this.models.push(model);
  }

  fillModels(modelReceived: Model[]) {
    modelReceived.forEach((model) => {
      let modelForPush: FormGroup = new FormGroup({
        description: new FormControl(model.description, Validators.required),
        costValue: new FormControl(model.costValue, Validators.required),
        saleValue: new FormControl(model.saleValue, Validators.required),
        minimumAmount: new FormControl(
          model.minimumAmount,
          Validators.required
        ),
      });

      this.models.push(modelForPush);
    });
  }

  removeModel(index: number) {
    this.models.removeAt(index);
  }

  onSubmit() {
    if (this.productForm.valid && this.models.length > 0) {
      let productToSend: any = this.productForm.value;

      let service = this.isEdition
        ? this.productsService.updateProduct(
            this.productIdLoaded,
            productToSend
          )
        : this.productsService.createProduct(productToSend);

      service.subscribe(
        (response) => {
          this.toastr.success(
            `Produto ${this.isEdition ? 'editado' : 'criado'}  com sucesso.`,
            `Produto ${this.isEdition ? 'editado' : 'criado'}!`
          );
          this.router.navigate([`produtos`]);
        },
        (error) => {
          this.toastr.error(
            `Erro ao ${this.isEdition ? 'editar' : 'criar'} produto.`,
            'Erro!'
          );
        }
      );
    } else if (
      this.productForm.invalid &&
      this.models.length > 0 &&
      this.models.invalid
    ) {
      this.toastr.error('Verifique o preenchimento dos modelos.', 'Erro!');
    } else if (this.productForm.invalid && this.models.length < 1) {
      if (this.productForm.controls['name'].invalid) {
        this.toastr.error('O produto deve possuir um nome.', 'Erro!');
      } else {
        this.toastr.error('O produto deve ter pelo menos 1 modelo.', 'Erro!');
      }
    } else if (this.productForm.invalid && this.models.length == 0) {
      this.toastr.error('Verifique o preenchimento dos campos.', 'Erro!');
    }
  }
}
