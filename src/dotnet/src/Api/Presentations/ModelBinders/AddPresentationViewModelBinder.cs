﻿using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;

namespace Sogeti.Academy.Api.Presentations.ModelBinders
{
    public class AddPresentationViewModelBinder : IModelBinder
    {
        //public async Task<ModelBindingResult> BindModelAsync(ModelBindingContext bindingContext)
        //{
        //    var formCollection = await bindingContext.OperationBindingContext.HttpContext.Request.ReadFormAsync();
        //    var viewModel = await MapToViewModel(formCollection);
        //    return ModelBindingResult.Success(bindingContext.FieldName, viewModel);
        //}

        //private static async Task<AddPresentationViewModel> MapToViewModel(IFormCollection formCollection)
        //{
        //    return new AddPresentationViewModel
        //    {
        //        Topic = formCollection.GetStringOrNull("topic"),
        //        Description = formCollection.GetStringOrNull("description"),
        //        Files = await MapFilesToViewModels(formCollection)
        //    };
        //}

        //private static async Task<AddFileViewModel[]> MapFilesToViewModels(IFormCollection formCollection)
        //{
        //    var tasks = formCollection.Files.Select(f => f.AsViewModel<AddFileViewModel>());
        //    return await Task.WhenAll(tasks);
        //}

        public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
        {
            return true;
        }
    }
}
