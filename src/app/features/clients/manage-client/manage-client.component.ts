import { Component, OnInit } from '@angular/core';
import { FormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client, ClientsService } from '../clients.service';

@Component({
  selector: 'app-manage-client',
  templateUrl: './manage-client.component.html',
  styleUrls: ['./manage-client.component.scss'],
})
export class ManageClientComponent implements OnInit {
  public isEdition: boolean = false;
  public productIdLoaded: any;
  public productLoaded: any;
  public clientForm: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    address: new UntypedFormControl('', Validators.required),
    email: new UntypedFormControl('', Validators.required),
    phoneNumber: new UntypedFormControl('', Validators.required),
    cep: new UntypedFormControl('', Validators.required),
    createdAt: new UntypedFormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    updatedAt: new UntypedFormControl(
      { value: '', disabled: true },
      Validators.required
    ),
  });

  public isLoaded: boolean = false;

  constructor(
    private activedRoute: ActivatedRoute,
    private clientsService: ClientsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.productIdLoaded = params['id'];

      if (this.productIdLoaded) {
        this.isEdition = true;
        this.loadClient(this.productIdLoaded);
      } else {
        this.isLoaded = true;
      }
    });
  }

  loadClient(id: string | number) {
    this.clientsService.getClientById(this.productIdLoaded).subscribe(
      (response: Client[]) => {
        this.isLoaded = true;
        this.productLoaded = response[0];
        this.fillClient(this.productLoaded);
      },
      (error) => {
        this.toastr.error(`Erro ao carregar cliente: ${id}`, 'Erro!');
      }
    );
  }

  fillClient(product: Client) {
    this.clientForm.patchValue({
      name: product.name,
      address: product.address,
      email: product.email,
      phoneNumber: product.phoneNumber,
      createdAt: product.createdAt?.slice(0, 16),
      updatedAt: product.updatedAt?.slice(0, 16),
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      let productToSend: any = this.clientForm.value;

      let service = this.isEdition
        ? this.clientsService.updateClient(this.productIdLoaded, productToSend)
        : this.clientsService.createClient(productToSend);

      service.subscribe(
        (response) => {
          this.toastr.success(
            `Cliente ${
              this.isEdition ? 'editado' : 'cadastrado'
            }  com sucesso.`,
            `Cliente ${this.isEdition ? 'editado' : 'cadastrado'}!`
          );
          this.router.navigate([`clientes`]);
        },
        (error) => {
          this.toastr.error(
            `Erro ao ${this.isEdition ? 'editar' : 'cadastrar'} cliente.`,
            'Erro!'
          );
        }
      );
    } else if (this.clientForm.invalid) {
      this.toastr.error('Verifique o preenchimento dos capos.', 'Erro!');
    }
  }
}
