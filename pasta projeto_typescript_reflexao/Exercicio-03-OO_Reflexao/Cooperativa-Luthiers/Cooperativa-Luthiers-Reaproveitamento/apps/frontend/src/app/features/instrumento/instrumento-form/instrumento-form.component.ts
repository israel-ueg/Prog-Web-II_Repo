import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InstrumentoService } from '../services/instrumento.service';
import { LuthierService } from '../../luthier/services/luthier.service';
import {
  CreateInstrumentoDto,
  UpdateInstrumentoDto,
  LuthierDto,
} from '@luthiers/utils';
import { BaseFormComponent } from '../../../core/base/base-form.component';
import { MetadataService } from '../../../core/services/metadata.service';
import { DynamicFormService } from '../../../core/services/dynamic-form.service';

/**
 * InstrumentoFormComponent refatorado estendendo BaseFormComponent (Herança OO).
 * Utiliza o MetadataService e DynamicFormService para enriquecer as validações
 * dinamicamente a partir dos metadados extraídos via Reflection no Backend.
 */
@Component({
  selector: 'app-instrumento-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './instrumento-form.component.html',
})
export class InstrumentoFormComponent
  extends BaseFormComponent
  implements OnInit
{
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private instrumentoService = inject(InstrumentoService);
  private luthierService = inject(LuthierService);
  private metadataService = inject(MetadataService);
  private dynamicFormService = inject(DynamicFormService);

  override form = this.fb.group({
    modeloMadeira: ['', Validators.required],
    dataEntrada: ['', Validators.required],
    reparoConcluido: [false],
    custoReparo: [
      0,
      [Validators.required, Validators.min(0), Validators.max(50000)],
    ],
    luthierId: [null as number | null, Validators.required],
  });

  instrumentoId = signal<number | null>(null);
  isEditMode = computed(() => this.instrumentoId() !== null);

  luthiersList = signal<LuthierDto[]>([]);
  dataAtual = new Date().toISOString().split('T')[0];

  get formattedCusto(): string {
    const val = this.form.get('custoReparo')?.value || 0;
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  }

  onCustoChange(event: any) {
    const val = event.target.value.replace(/\D/g, '');
    if (!val) {
      this.form.get('custoReparo')?.setValue(0);
      this.form.get('custoReparo')?.markAsDirty();
      event.target.value = '0,00';
      return;
    }
    const num = parseInt(val, 10) / 100;
    this.form.get('custoReparo')?.setValue(num);
    this.form.get('custoReparo')?.markAsDirty();

    event.target.value = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  }

  onCustoBlur() {
    this.form.get('custoReparo')?.markAsTouched();
  }

  ngOnInit(): void {
    // Sincroniza validações dinamicamente via Reflection do backend
    this.metadataService.getFieldMetadata('instrumento').subscribe({
      next: (meta) => {
        this.dynamicFormService.applyDynamicValidators(this.form, meta.fields);
      },
      error: () => {
        // Degradação graciosa mantendo validações locais caso a API falhe
      },
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.instrumentoId.set(Number(idParam));
    }
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.initialLoading.set(true);

    this.luthierService.getAll().subscribe({
      next: (luthiers) => {
        this.luthiersList.set(luthiers);

        if (this.isEditMode()) {
          this.loadInstrumento(this.instrumentoId()!);
        } else {
          this.initialLoading.set(false);
        }
      },
      error: () => {
        this.globalError.set(
          'Erro ao carregar a lista de luthiers. Não será possível registrar um instrumento.',
        );
        this.initialLoading.set(false);
      },
    });
  }

  loadInstrumento(id: number): void {
    this.instrumentoService.getById(id).subscribe({
      next: (instrumento) => {
        const dataEntradaFormated = new Date(instrumento.dataEntrada)
          .toISOString()
          .split('T')[0];

        this.form.patchValue({
          modeloMadeira: instrumento.modeloMadeira,
          dataEntrada: dataEntradaFormated,
          reparoConcluido: instrumento.reparoConcluido,
          custoReparo: instrumento.custoReparo,
          luthierId: instrumento.luthierId,
        });
        this.initialLoading.set(false);
      },
      error: () => {
        this.globalError.set(
          'Erro ao carregar dados do instrumento. Ele pode não existir mais.',
        );
        this.initialLoading.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.globalError.set(null);
    this.clearBackendErrors();

    const formData = this.form.value;
    const dataToSend = {
      ...formData,
      luthierId: Number(formData.luthierId),
    };

    const request$ = this.isEditMode()
      ? this.instrumentoService.update(
          this.instrumentoId()!,
          dataToSend as UpdateInstrumentoDto,
        )
      : this.instrumentoService.create(dataToSend as CreateInstrumentoDto);

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/instrumentos']);
      },
      error: (err) => {
        this.saving.set(false);
        this.handleBackendErrors(err);
      },
    });
  }
}
