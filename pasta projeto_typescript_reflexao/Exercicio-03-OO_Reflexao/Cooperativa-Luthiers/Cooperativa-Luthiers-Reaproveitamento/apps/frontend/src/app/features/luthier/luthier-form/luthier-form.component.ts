import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LuthierService } from '../services/luthier.service';
import { CreateLuthierDto, UpdateLuthierDto } from '@luthiers/utils';
import { BaseFormComponent } from '../../../core/base/base-form.component';
import { MetadataService } from '../../../core/services/metadata.service';
import { DynamicFormService } from '../../../core/services/dynamic-form.service';

/**
 * LuthierFormComponent refatorado estendendo BaseFormComponent (Herança OO).
 * Integra MetadataService e DynamicFormService para enriquecer as validações
 * dinamicamente a partir dos metadados extraídos via Reflection no Backend.
 */
@Component({
  selector: 'app-luthier-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './luthier-form.component.html',
})
export class LuthierFormComponent extends BaseFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private luthierService = inject(LuthierService);
  private metadataService = inject(MetadataService);
  private dynamicFormService = inject(DynamicFormService);

  override form = this.fb.group({
    nomeMestre: ['', Validators.required],
    dataAbertura: ['', Validators.required],
    certificada: [false],
    bancadasNum: [0, [Validators.required, Validators.min(2)]],
  });

  luthierId = signal<string | null>(null);
  isEditMode = computed(() => this.luthierId() !== null);

  ngOnInit(): void {
    // Sincroniza validações dinamicamente via Reflection do backend
    this.metadataService.getFieldMetadata('luthier').subscribe({
      next: (meta) => {
        this.dynamicFormService.applyDynamicValidators(this.form, meta.fields);
      },
      error: () => {
        // Degradação graciosa mantendo validações locais caso a API falhe
      },
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.luthierId.set(id);
      this.loadLuthier(id);
    }
  }

  loadLuthier(id: string): void {
    this.initialLoading.set(true);
    this.luthierService.getById(id).subscribe({
      next: (luthier) => {
        const dataAberturaFormated = new Date(luthier.dataAbertura)
          .toISOString()
          .split('T')[0];

        this.form.patchValue({
          nomeMestre: luthier.nomeMestre,
          dataAbertura: dataAberturaFormated,
          certificada: luthier.certificada,
          bancadasNum: luthier.bancadasNum,
        });
        this.initialLoading.set(false);
      },
      error: () => {
        this.globalError.set(
          'Erro ao carregar dados do luthier. Ele pode não existir mais.',
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
    const dataToSend = { ...formData };

    const request$ = this.isEditMode()
      ? this.luthierService.update(
          this.luthierId()!,
          dataToSend as UpdateLuthierDto,
        )
      : this.luthierService.create(dataToSend as CreateLuthierDto);

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/luthiers']);
      },
      error: (err) => {
        this.saving.set(false);
        this.handleBackendErrors(err);
      },
    });
  }
}
